var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BLU4i9WvrTomsf7WRrcq4r0V4G9aghVAzcZMRb4D6OQe1dqEscMhBQP4DcEaW5isKbSExuGuPtknMjPpdHrh1Dc",
  privateKey: "AxtmSqLLHV2NZR7FN9zvFoe75-i_igJsqF6Qlg-40bg",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/dpuAo4kzMmI:APA91bG6lBA5aK41CZ0ViaVHzB5PFeBC_jF0tD5jKoLS6PZ1lO4a9oDWd2SytD2NACcE3AP_nlsnXi5i2O6MlV_tXMLkGQpA-WO7TNdZLVb0gSCwhmfNbyOLc01vZMlwu9Z15ONz1WOO",
  keys: {
    p256dh:
      "BFLyBtg5/F0v13YvL0a4yWJGkaviDebYE1uLH+jF0cS7gZfr/TNvTflVuzt2IDGU8i3RUwI5d8xIiBip5ms5FgM=",
    auth: "+Zdtly5ZoW4KhE6Zv+QFpg==",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "989217787393",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
