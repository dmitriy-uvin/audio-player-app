CREATE POLICY "Enable insert for authenticated users only" ON "public"."songs"
AS PERMISSIVE FOR INSERT
TO authenticated

WITH CHECK (true)