# Temperature backend

Measurements are sent to Google Cloud function, which writes them to a PostgreSQL database.

## Cloud SQL

Create a PostgreSQL Cloud SQL database, create a table:
```sql
CREATE TABLE measurements (
    timestamp   timestamp with time zone,
    humidity    real,
    temperature real,
    PRIMARY KEY(timestamp)
);
```

No need to expose the SQL table to the internet.
Create an user and add its authentication data to the `.env`.

## Secrets

Create a key ring & key
```
gcloud kms keyrings create [KEYRING_NAME] --location=global
gcloud kms keys create [KEY_NAME] --location global --keyring [KEYRING_NAME] --purpose encryption
```

## Set up local tooling

- Get Google Cloud CLI tool
- `gcloud init`
- Set secrets to the `.env`
- Use `npm`! Do not use `yarn`, as Google Cloud Functions won't read its lockfile.

# Deployment

```bash
npm run-script build
ENCRYPTED_ENV=`cat .env | gcloud kms encrypt --location=global --keyring=[KEYRING_NAME] --key=[KEY_NAME] --ciphertext-file=- --plaintext-file=- | base64`
gcloud beta functions deploy recordTemperature --region=europe-west1 --entry-point=recordTemperature --runtime=nodejs8 --trigger-http --set-env-vars ENCRYPTED_ENV=$ENCRYPTED_ENV,CRYPTO_KEY_PATH=projects/[GOOGLE_PROJECT_NAME]/locations/global/keyRings/[KEYRING_NAME]/cryptoKeys/[KEY_NAME]
```

After deployment, copy-paste the trigger URL to the client's config.
Ensure that the service account, used by the cloud fn, has an `decrypt` access to the keyring.
