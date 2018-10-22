# Frontend for the measurements

Run with app engine. Use Google cloud's IAP for the ACL.
Fill the `config.json`.

## Deployment

```bash
gcloud app deploy --quiet  && gcloud app logs tail -s default  
```

## Hellos

Based somewhat on the Google App Engine example project.
