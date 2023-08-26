create table
    public.customers (
                         id uuid not null,
                         stripe_customer_id text null,
                         constraint customers_pkey primary key (id),
                         constraint customers_id_fkey foreign key (id) references auth.users (id)
) tablespace pg_default;