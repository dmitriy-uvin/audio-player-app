create table
    public.prices (
                      id text not null,
                      product_id text null,
                      active boolean null,
                      description text null,
                      unit_amount bigint null,
                      currency text null,
                      type public.pricing_type null,
                      interval public.pricing_plan_interval null,
                      interval_count integer null,
                      trial_period_days integer null,
                      metadata jsonb null,
                      constraint prices_pkey primary key (id),
                      constraint prices_product_id_fkey foreign key (product_id) references products (id),
                      constraint prices_currency_check check ((char_length(currency) = 3))
) tablespace pg_default;