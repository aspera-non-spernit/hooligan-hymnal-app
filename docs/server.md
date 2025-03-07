# Server Settings

## Required Env Variables
### Development
  ```
  PORT=5000
  MONGO_URI=mongodb://localhost/<db_name_here>
  SECRET_KEY=
  TOKEN_EXPIRES=
  REFRESH_SECRET_KEY=
  REFRESH_TOKEN_EXPIRES=
  API_KEY=
  ENV=development
  CLOUDINARY_URL=<Generate following link below.>
  ```

### Production
  ```
  MONGO_URI=<MLab URL>
  SECRET_KEY=
  TOKEN_EXPIRES=
  REFRESH_SECRET_KEY=
  REFRESH_TOKEN_EXPIRES=
  CLOUDINARY_URL=<Generate following link below.>
  ```

## Settings requirements
  ### PORT (DEV)
  `PORT=5000` uses to run both dev node server along with vue-cli

  ### MONGO_URI (DEV)
  `MONGO_URI=mongodb://localhost/<db_name_here>` could be url for local mongodb or mLab

  ### MONGO_URI (PROD)
  `MONGO_URI=<mlab_url>` - url to your mLab instance

  ### JWT Settings
  #### KEYS
  `SECRET_KEY` random string of charaters, can be anything, suggest making the secret key in prod different from dev enviorment.

  Encrypts your default jwt

  `REFRESH_SECRET_KEY` random string of charaters, can be anything, suggest making the secret key in prod different from dev enviorment.

  Encrypts your remember_me jwt

  #### REFRESH
  All of the following settings are settings for passport-jwt.

  If either of these options aren't set the default server options are "1h" and "1d" respectively.

  `TOKEN_EXPIRES` string of how long you want your tokens will be valid for.

  - Avaliable options "1h" - "30d"

  `REFRESH_TOKEN_EXPIRES` same as `TOKEN_EXPIRES` this will affect how long your remember_me tokens will be valid for.

  ### Cloudinary
  This is our chose of image service we are using, If you would like to use a different service please make the changes in the nessesary files in your own fork.

  To generate you cloudinary url, go to [https://cloudinary.com/](https://cloudinary.com/) and create/login to an account. The basic free plan should be enough for most everyone. Once logged it should make an new cloud for you. Once you get to the dashboard. You should then see Account Detials, hit reveal next to API Secret then copy Enviorment variable, this is the url will be used for `CLOUDINARY_URL`, you can test it by uploading a new file from the players create form, and then check back in the cloudinary dashboard to verify it uploaded. You can then delete it and you will be able to upload images now that are served on a CDN.
