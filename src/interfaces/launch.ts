interface Launch {
  id: string;
  mission_name: string;
  rocket: Rocket;
  details: null | string;
  launch_date_utc: string;
}

interface LaunchDetails {
  mission_name: string;
  rocket: Rocket;
  details: string;
  launch_date_utc: string;
  launch_site?: LaunchSite;
  links: Links;
}

interface LaunchSite {
  site_name: string;
}

interface Rocket {
  rocket_name: string;
  rocket_type: string;
}

interface Links {
  article_link: string;
  video_link: string;
}
