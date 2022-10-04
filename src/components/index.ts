/* eslint-disable max-len */
import { lazy } from 'react';

export const Navbar = lazy(() => import('./Navbar/Navbar' /* webpackChunkName: "Navbar" */));
export const AboutUs = lazy(() => import('Pages/Landing/Aboutus/Aboutus' /* webpackChunkName: "AboutUs section" */));
export const Events = lazy(() => import('Pages/Landing/Events' /* webpackChunkName: "Events_section" */));
export const Hero = lazy(() => import('Pages/Landing/Hero' /* webpackChunkName: "Hero" */));
export const LogosCarousel = lazy(() => import('Pages/Landing/LogosCarousel' /* webpackChunkName: "LogosCarousel" */));
export const PremiumEvent = lazy(
  () => import('Pages/Landing/PremiumEvent/PremiumEvent' /* webpackChunkName: "PremiumEventSection" */),
);
export const Projects = lazy(() => import('Pages/Landing/Projects' /* webpackChunkName: "Projects_section" */));
export const SocialImpact = lazy(
  () => import('Pages/Landing/SocialImpact' /* webpackChunkName: "SocialImpact_section" */),
);
export const SubscribeDivider = lazy(
  () => import('Pages/Landing/SubscribeDivider' /* webpackChunkName: "SubscribeDivider" */),
);
export const Footer = lazy(() => import('./Footer/Footer' /* webpackChunkName: "Footer" */));
export const Volunteers = lazy(() => import('Pages/Landing/Volunteers' /* webpackChunkName: "Volunteers section" */));
export const Divider = lazy(() => import('Pages/Landing/Divider/Divider' /* webpackChunkName: "Divider" */));
export const Courses = lazy(() => import('Pages/Landing/Courses' /* webpackChunkName: "Courses_section" */));
export const DonateForm = lazy(() => import('./Forms/DonateForm' /* webpackChunkName: "DonateForm" */));
export const Modal = lazy(() => import('./Modal' /* webpackChunkName: "BuyModal" */));
export const FinalizePaymentResult = lazy(
  () => import('./FinalizePaymentResult' /* webpackChunkName: "FinalizePaymentResult" */),
);
export const Map = lazy(() => import('./Map' /* webpackChunkName: "Map" */));
export const RenderIf = lazy(() => import('./RenderIf' /* webpackChunkName: "RenderIf" */));
export const Skeleton = lazy(() => import('./Skeleton' /* webpackChunkName: "Skeleton" */));
export { default as Loader } from './Loader/Loader';
