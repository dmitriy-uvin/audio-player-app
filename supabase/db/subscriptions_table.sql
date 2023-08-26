create table
    public.subscriptions (
                             id text not null,
                             user_id uuid not null,
                             status public.subscription_status null,
                             metadata jsonb null,
                             price_id text null,
                             quantity integer null,
                             cancel_at_period_end boolean null,
                             created timestamp with time zone not null default timezone ('utc'::text, now()),
                             current_period_start timestamp with time zone not null default timezone ('utc'::text, now()),
                             current_period_end timestamp with time zone not null default timezone ('utc'::text, now()),
                             ended_at timestamp with time zone null default timezone ('utc'::text, now()),
                             cancel_at timestamp with time zone null default timezone ('utc'::text, now()),
                             canceled_at timestamp with time zone null default timezone ('utc'::text, now()),
                             trial_start timestamp with time zone null default timezone ('utc'::text, now()),
                             trial_end timestamp with time zone null default timezone ('utc'::text, now()),
                             constraint subscriptions_pkey primary key (id),
                             constraint subscriptions_price_id_fkey foreign key (price_id) references prices (id),
                             constraint subscriptions_user_id_fkey foreign key (user_id) references auth.users (id)
) tablespace pg_default;