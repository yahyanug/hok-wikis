-- Category and asset names follow the existing frontend catalog. Preserve curated values and custom URLs.
WITH frontend_items(asset_slug, category) AS (
    VALUES
        ('axe-of-torment', 'ATTACK'),
        ('bloodweeper', 'ATTACK'),
        ('cloud-piercer', 'ATTACK'),
        ('dagger', 'ATTACK'),
        ('daybreaker-s-virtue', 'ATTACK'),
        ('demonsbane', 'ATTACK'),
        ('destiny', 'ATTACK'),
        ('doomsday', 'ATTACK'),
        ('dragon-s-rage', 'ATTACK'),
        ('eternity-blade', 'ATTACK'),
        ('golden-blade', 'ATTACK'),
        ('immovable-sky-dome', 'ATTACK'),
        ('iron-sword', 'ATTACK'),
        ('master-sword', 'ATTACK'),
        ('meteor', 'ATTACK'),
        ('mortal-punisher', 'ATTACK'),
        ('nettle-gauntlet', 'ATTACK'),
        ('primordial-crystal', 'ATTACK'),
        ('pugilist-s-gauntlet', 'ATTACK'),
        ('pure-sky', 'ATTACK'),
        ('relentless-blade', 'ATTACK'),
        ('shadow-ripper', 'ATTACK'),
        ('sparkforged-dagger', 'ATTACK'),
        ('starbreaker', 'ATTACK'),
        ('storm-sword', 'ATTACK'),
        ('sunchaser', 'ATTACK'),
        ('sunglow-striker', 'ATTACK'),
        ('swiftstrike-lance', 'ATTACK'),
        ('tempest', 'ATTACK'),
        ('vampiric-scythe', 'ATTACK'),
        ('ardent-dominion', 'MAGIC'),
        ('augur-s-word', 'MAGIC'),
        ('blood-clan-s-grimoire', 'MAGIC'),
        ('bloodsoul', 'MAGIC'),
        ('breakthrough-robe', 'MAGIC'),
        ('enigma-moon-goddess', 'MAGIC'),
        ('frozen-breath', 'MAGIC'),
        ('grand-staff', 'MAGIC'),
        ('holy-grail', 'MAGIC'),
        ('insatiable-tome', 'MAGIC'),
        ('mask-of-agony', 'MAGIC'),
        ('mystic-page', 'MAGIC'),
        ('nebulon-wood', 'MAGIC'),
        ('plume-of-enchantment', 'MAGIC'),
        ('sage-s-codex', 'MAGIC'),
        ('sage-s-tome', 'MAGIC'),
        ('savant-s-wrath', 'MAGIC'),
        ('scepter-of-reverberation', 'MAGIC'),
        ('spell-tome', 'MAGIC'),
        ('splendor', 'MAGIC'),
        ('staves-of-sorcery', 'MAGIC'),
        ('stone-of-sorcery', 'MAGIC'),
        ('twilight-stream', 'MAGIC'),
        ('twinblades-of-destruction', 'MAGIC'),
        ('venomous-staff', 'MAGIC'),
        ('void-staff', 'MAGIC'),
        ('amble-winter', 'DEFENSE'),
        ('belt-of-might', 'DEFENSE'),
        ('blazing-cape', 'DEFENSE'),
        ('blood-rage', 'DEFENSE'),
        ('clandestine-cape', 'DEFENSE'),
        ('cloth-jerkin', 'DEFENSE'),
        ('cuirass-of-savagery', 'DEFENSE'),
        ('cuirass-of-swiftness', 'DEFENSE'),
        ('deepfrost-siege', 'DEFENSE'),
        ('eye-of-the-phoenix', 'DEFENSE'),
        ('frigid-charge', 'DEFENSE'),
        ('frosthold-targe', 'DEFENSE'),
        ('frostscar-s-embrace', 'DEFENSE'),
        ('glacial-buckler', 'DEFENSE'),
        ('longnight-guardian', 'DEFENSE'),
        ('mirror-of-radiance', 'DEFENSE'),
        ('ominous-premonition', 'DEFENSE'),
        ('overlord-s-might', 'DEFENSE'),
        ('overlord-s-platemail', 'DEFENSE'),
        ('protector-s-cuirass', 'DEFENSE'),
        ('resilient-agate', 'DEFENSE'),
        ('sage-s-sanctuary', 'DEFENSE'),
        ('spikemail', 'DEFENSE'),
        ('succubus-cloak', 'DEFENSE'),
        ('boots-of-deftness', 'MOVEMENT'),
        ('boots-of-dexterity', 'MOVEMENT'),
        ('boots-of-fortitude', 'MOVEMENT'),
        ('boots-of-resistance', 'MOVEMENT'),
        ('boots-of-the-arcane', 'MOVEMENT'),
        ('boots-of-tranquility', 'MOVEMENT'),
        ('lightfoot-shoes', 'MOVEMENT'),
        ('giant-s-grip', 'JUNGLING'),
        ('guerrilla-machete', 'JUNGLING'),
        ('hunting-knife', 'JUNGLING'),
        ('patrol-axe', 'JUNGLING'),
        ('rapacious-bite', 'JUNGLING'),
        ('ravage-phantom', 'JUNGLING'),
        ('runeblade', 'JUNGLING'),
        ('crimson-shadow', 'ROAMING'),
        ('crimson-shadow-howl', 'ROAMING'),
        ('crimson-shadow-radiance', 'ROAMING'),
        ('crimson-shadow-redemption', 'ROAMING'),
        ('crimson-shadow-starspring', 'ROAMING'),
        ('dawnlight', 'ROAMING'),
        ('guardian', 'ROAMING'),
        ('guardian-radiance', 'ROAMING'),
        ('guardian-redemption', 'ROAMING'),
        ('guardian-starspring', 'ROAMING'),
        ('haste-sunpool', 'ROAMING'),
        ('knowledge-gem', 'ROAMING'),
        ('thunderclap-brand', 'ROAMING')
)
UPDATE item resource
SET category = COALESCE(resource.category, reference.category),
    image_url = CASE
        WHEN resource.image_url = '/images/items/' || resource.slug || '.png'
            THEN '/images/items/' || reference.asset_slug || '.png'
        ELSE resource.image_url
    END
FROM frontend_items reference
WHERE regexp_replace(resource.slug, '[^a-z0-9]', '', 'g')
    = regexp_replace(reference.asset_slug, '[^a-z0-9]', '', 'g');

UPDATE arcana SET image_url = '/images/arcana/mind-s-eye.png'
WHERE slug = 'minds-eye' AND image_url = '/images/arcana/minds-eye.png';

UPDATE spells
SET image_url = '/images/spells/' || slug || CASE WHEN slug = 'teleport' THEN '.webp' ELSE '.jpg' END
WHERE slug IN ('execute', 'flash', 'frenzy', 'heal', 'intimidate', 'purify', 'smite', 'sprint', 'stun', 'teleport')
    AND image_url = '/images/spells/' || slug || '.png';

UPDATE hero
SET image_url = '/images/ying-lny2026.png', image_position = COALESCE(image_position, 'center 25%')
WHERE slug = 'ying' AND image_url = '/images/heroes/ying.png';

-- Other hero portraits are not present in the frontend assets. The catalog supplies its existing fallback image.
UPDATE hero SET image_url = NULL
WHERE slug != 'ying' AND image_url = '/images/heroes/' || slug || '.png';

-- Keep the existing curated stats text while making it available to the frontend's attribute list.
UPDATE arcana resource
SET attributes = (
    SELECT COALESCE(jsonb_agg(jsonb_build_object('label', btrim(part)) ORDER BY entry_order), '[]'::jsonb)
    FROM regexp_split_to_table(resource.stats, ';') WITH ORDINALITY AS stat_parts(part, entry_order)
    WHERE btrim(part) != ''
)
WHERE resource.attributes = '[]'::jsonb AND btrim(resource.stats) != '';
