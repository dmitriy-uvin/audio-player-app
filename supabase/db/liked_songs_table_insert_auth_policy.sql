CREATE POLICY "Enable insert for authenticated users only" ON "public"."liked_songs"
AS PERMISSIVE FOR INSERT
TO authenticated

WITH CHECK (true)