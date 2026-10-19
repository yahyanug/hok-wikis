package com.hok_wiki.exception;

import java.util.ArrayList;
import java.util.List;

import com.hok_wiki.constant.ErrorCodeGlobalEnum;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.Nullable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(BusinessException.class)
	public ResponseEntity<Object> handleBusinessException(BusinessException exception) {
		return buildResponseEntity(exception.getApiError());
	}

	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<Object> handleAuthentication(AuthenticationException exception) {
		AuthErrorCodeEnum error = exception instanceof LockedException
				? AuthErrorCodeEnum.ACCOUNT_LOCKED : AuthErrorCodeEnum.INVALID_CREDENTIALS;
		return buildResponseEntity(new ApiError(error));
	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<Object> handleAccessDenied(AccessDeniedException exception) {
		return buildResponseEntity(new ApiError(ErrorCodeGlobalEnum.HTTP_ACCESS_DENIED));
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<Object> handleDataIntegrityViolation(DataIntegrityViolationException exception) {
		return buildResponseEntity(new ApiError(ErrorCodeGlobalEnum.CONSTRAINT_VIOLATION));
	}

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<Object> handleEntityNotFound(EntityNotFoundException exception) {
		return buildResponseEntity(new ApiError(ErrorCodeGlobalEnum.ENTITY_NOT_FOUND, "Record"));
	}

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException exception) {
		List<ApiValidationError> subErrors = exception.getConstraintViolations().stream()
				.map(error -> new ApiValidationError(error.getRootBeanClass().getSimpleName(),
						error.getPropertyPath().toString(), error.getMessage()))
				.toList();
		return buildResponseEntity(validationError(subErrors));
	}

	@ExceptionHandler(BindException.class)
	public ResponseEntity<Object> handleBindingException(BindException exception) {
		return buildResponseEntity(validationError(exception.getBindingResult().getAllErrors().stream()
				.map(this::toValidationError).toList()));
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<Object> handleIllegalArgument(IllegalArgumentException exception) {
		return buildResponseEntity(new ApiError(ErrorCodeGlobalEnum.INVALID_ARGUMENT));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleUnexpectedException(Exception exception) {
		log.error("Unhandled exception of type {}", exception.getClass().getName());
		return buildResponseEntity(new ApiError(ErrorCodeGlobalEnum.RUNTIME_EXCEPTION));
	}

	@Override
	protected @Nullable ResponseEntity<Object> handleMethodArgumentNotValid(
			MethodArgumentNotValidException exception, HttpHeaders headers, HttpStatusCode status,
			WebRequest request) {
		ApiError error = validationError(exception.getBindingResult().getAllErrors().stream()
				.map(this::toValidationError).toList());
		return handleExceptionInternal(exception, error, headers, status, request);
	}

	@Override
	protected @Nullable ResponseEntity<Object> handleHandlerMethodValidationException(
			HandlerMethodValidationException exception, HttpHeaders headers, HttpStatusCode status,
			WebRequest request) {
		if (exception.isForReturnValue()) {
			return handleExceptionInternal(exception, null, headers, status, request);
		}
		List<ApiValidationError> subErrors = new ArrayList<>();
		exception.getParameterValidationResults().forEach(result -> {
			String parameter = result.getMethodParameter().getParameterName();
			result.getResolvableErrors().forEach(error -> {
				if (error instanceof ObjectError objectError) {
					subErrors.add(toValidationError(objectError));
				}
				else {
					subErrors.add(new ApiValidationError(null, parameter, error.getDefaultMessage()));
				}
			});
		});
		exception.getCrossParameterValidationResults().forEach(error ->
				subErrors.add(new ApiValidationError(null, null, error.getDefaultMessage())));
		return handleExceptionInternal(exception, validationError(subErrors), headers, status, request);
	}

	@Override
	protected @Nullable ResponseEntity<Object> handleExceptionInternal(Exception exception, @Nullable Object body,
			HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
		HttpStatus status = HttpStatus.resolve(statusCode.value());
		if (status == null) {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		ApiError error = body instanceof ApiError apiError ? apiError : httpError(exception, status);
		if (status.is5xxServerError()) {
			log.error("Unhandled exception of type {}", exception.getClass().getName());
		}
		return super.handleExceptionInternal(exception, error, headers, status, request);
	}

	private ApiError httpError(Exception exception, HttpStatus status) {
		if (status.is5xxServerError()) {
			return new ApiError(status, ErrorCodeGlobalEnum.RUNTIME_EXCEPTION);
		}
		if (exception instanceof HttpMessageNotReadableException) {
			return new ApiError(status, ErrorCodeGlobalEnum.HTTP_MESSAGE_NOT_READABLE);
		}
		return switch (status) {
			case BAD_REQUEST -> new ApiError(status, ErrorCodeGlobalEnum.INVALID_ARGUMENT);
			case UNAUTHORIZED -> new ApiError(status, ErrorCodeGlobalEnum.UNAUTHORIZED);
			case FORBIDDEN -> new ApiError(status, ErrorCodeGlobalEnum.HTTP_ACCESS_DENIED);
			case NOT_FOUND -> new ApiError(ErrorCodeGlobalEnum.ENTITY_NOT_FOUND, "Resource");
			case CONFLICT -> new ApiError(status, ErrorCodeGlobalEnum.CONSTRAINT_VIOLATION);
			default -> new ApiError(status, ErrorCodeGlobalEnum.HTTP_ERROR, status.getReasonPhrase(), List.of());
		};
	}

	private ApiValidationError toValidationError(ObjectError error) {
		if (error instanceof FieldError fieldError) {
			return new ApiValidationError(fieldError.getObjectName(), fieldError.getField(),
					fieldError.isBindingFailure() ? "Invalid value" : fieldError.getDefaultMessage());
		}
		return new ApiValidationError(error.getObjectName(), null, error.getDefaultMessage());
	}

	private ApiError validationError(List<ApiValidationError> subErrors) {
		return new ApiError(HttpStatus.BAD_REQUEST, ErrorCodeGlobalEnum.VALIDATION_ERROR,
				ErrorCodeGlobalEnum.VALIDATION_ERROR.getDescription(), subErrors);
	}

	private ResponseEntity<Object> buildResponseEntity(ApiError error) {
		return new ResponseEntity<>(error, error.status());
	}

}
