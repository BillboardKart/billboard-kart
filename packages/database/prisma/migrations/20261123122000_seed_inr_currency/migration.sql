INSERT INTO "currencies" ("code", "symbol", "decimal_places")
VALUES ('INR', '₹', 2)
ON CONFLICT ("code") DO NOTHING;
