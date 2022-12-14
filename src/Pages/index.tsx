/* eslint-disable max-len */
import { lazy } from 'react';

export const Landing = lazy(() => import('./Landing' /* webpackChunkName: "Landing" */));
export const Aboutus = lazy(() => import('./Aboutus' /* webpackChunkName: "Aboutus_page" */));
export const ProjectDetails = lazy(() => import('./ProjectDetails' /* webpackChunkName: "ProjectDetails" */));
export const Donate = lazy(() => import('./Donate' /* webpackChunkName: "Donate" */));
export const Shop = lazy(() => import('./Shop' /* webpackChunkName: "Shop" */));
export const BecomeVolunteerForm = lazy(
  () => import('./BecomeVolunteerForm' /* webpackChunkName: "BecomeVolunteerForm" */),
);
export const DonateForm = lazy(() => import('../components/Forms/DonateForm' /* webpackChunkName: "DonateForm" */));
export const ContactUsForm = lazy(
  () => import('../components/Forms/ContactUsForm' /* webpackChunkName: "Contactus" */),
);
export const SingleEvent = lazy(() => import('./EventDetails' /* webpackChunkName: "SingleEvent" */));
export const SingleProduct = lazy(() => import('./ProductDetails' /* webpackChunkName: "SingleProduct" */));
export const TermsAndConditions = lazy(
  () => import('./TermsAndConditions' /* webpackChunkName: "TermsAndConditions" */),
);
export const ErrorPage = lazy(() => import('./ErrorPage' /* webpackChunkName: "ErrorPage" */));
export const FinalizeDonationPage = lazy(() => import('./FinalizeDonation' /* webpackChunkName: "FinalizeDonation" */));
export const FinalizeProjectDonationPage = lazy(
  () => import('./FinalizeProjectDonation' /* webpackChunkName: "FinalizeProjectDonation" */),
);
export const FinalizeCoursePaymentPage = lazy(
  () => import('./FinalizeCoursePayment' /* webpackChunkName: "FinalizeCoursePayment" */),
);
export const FinalizeEventPaymentPage = lazy(
  () => import('./FinalizeEventPayment' /* webpackChunkName: "FinalizeEventPayment" */),
);
export const FinalizeProductPaymentPage = lazy(
  () => import('./FinalizeProductPayment' /* webpackChunkName: "FinalizeProductPayment" */),
);
export const FinalizeSubscriptionDonationPage = lazy(
  () => import('./FinalizeSubscriptionDonation' /* webpackChunkName: "FinalizeSubscriptionDonation" */),
);
export const BecomeMemberForm = lazy(
  () => import('../components/Forms/BecomeMemberForm' /* webpackChunkName: "BecomeMemberForm" */),
);
export const StripeContainer = lazy(
  () => import('./StripeCheckout/StripeContainer' /* webpackChunkName: "StripeContainer" */),
);
export const SuccessfulStripePayment = lazy(
  () => import('./PaymentSuccess/PaymentSuccess' /* webpackChunkName: "SuccessfulStripePayment" */),
);
export { default as CrashPage } from './CrashPage';
