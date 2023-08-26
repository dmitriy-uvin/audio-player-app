create table
    public.users (
                     id uuid not null,
                     full_name text null,
                     avatar_url text null,
                     billing_address jsonb null,
                     payment_method jsonb null,
                     constraint users_pkey primary key (id),
                     constraint users_id_fkey foreign key (id) references auth.users (id)
) tablespace pg_default;