-- Baseline inicial do schema ZooRacoes.
-- Migrations de domínio entram nas próximas versões (V2, V3, ...).

CREATE TABLE IF NOT EXISTS schema_baseline (
    id          SMALLINT PRIMARY KEY DEFAULT 1,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT schema_baseline_singleton CHECK (id = 1)
);

INSERT INTO schema_baseline (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;
