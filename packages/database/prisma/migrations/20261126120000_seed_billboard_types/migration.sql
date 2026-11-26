-- Seed the billboard types used by the owner Add Billboard flow.
-- Existing rows are left untouched so environments that already have them
-- are unaffected.
INSERT INTO "billboard_categories" ("code", "name", "sort_order")
VALUES ('physical_static', 'Physical Static', 2)
ON CONFLICT ("code") DO NOTHING;

INSERT INTO "billboard_types" ("category_id", "code", "name", "display_badge", "is_active")
SELECT
  c."id",
  v."code",
  v."name",
  v."display_badge",
  true
FROM "billboard_categories" c
CROSS JOIN (
  VALUES
    ('roadside_hoarding', 'Roadside Hoarding', 'Static'),
    ('unipole', 'Unipole', 'Static'),
    ('gantry', 'Gantry', 'Static'),
    ('building_facade', 'Building Facade', 'Static')
) AS v("code", "name", "display_badge")
WHERE c."code" = 'physical_static'
ON CONFLICT ("code") DO NOTHING;
