import { news, calendar, events, help, user, dashboard, settings, inbox } from "../assets";

export const navLinksNavbar = [
  {
    id: "",
    title: "Home",
  },
  {
    id: "news",
    title: "News",
  },
  {
    id: "faq",
    title: "FAQ",
  },
  {
    id: "login",
    title: "Login",
  },
  {
    id: "signup",
    title: "Get Started",
  },
];

export const navLinksSidebar = [
  {
    id: "dashboard",
    title: "Dashboard",
    img: dashboard,
  },
  {
    id: "events",
    title: "Events",
    img: events,
    gap: true,
  },
  {
    id: "calendar",
    title: "Calendar",
    img: calendar,
  },
  {
    id: "friends",
    title: "Friends",
    img: user,
  },
  {
    id: "support",
    title: "Support",
    img: inbox,
    gap: true,
  },
  {
    id: "settings",
    title: "Settings",
    img: settings,
  },
];