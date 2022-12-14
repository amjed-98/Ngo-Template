import BASE_URL from './baseUrl';

const ngoUrl = ['development', 'staging'].includes(import.meta.env.MODE)
  ? 'hello.web.lazzaro.io'
  : window.location.host;

export const getProjectsURL = (ongId: string) => `${BASE_URL}/api/private/projects/ong/${ongId}`;
export const getProjectDetailsURL = (id: string) => `${BASE_URL}/api/private/projects/${id}`;
export const getProjectImagesURL = (projectId: string) => `${BASE_URL}/api/private/projectimages/${projectId}`;
export const getProjectLatestDonationsURL = (causeId: string) => `${BASE_URL}/api/private/comments/${causeId}`;
export const getEventsURL = (ongId: string) => `${BASE_URL}/api/private/events/ong/${ongId}`;
export const getCauseDetailsURL = (id: string) => `${BASE_URL}/api/private/projects/${id}`;
export const getCauseImagesURL = (id: string) => `${BASE_URL}/api/private/projectimages/${id}`;
export const getCauseDonationsHistoryUrl = (causeId: string) => `${BASE_URL}/api/private/comments/${causeId}`;
export const getPlatformConfigUrl = (ngoId: string) => `${BASE_URL}/api/private/ongs/${ngoId}/all-platform-config`;
export const getNgoConfigUrl = () => `${BASE_URL}/api/private/ongs/${ngoUrl}/id`;
export const getEventURL = (eventId: string) => `${BASE_URL}/api/private/events/${eventId}`;
export const getCoursesImages = (id: string) => `${BASE_URL}/api/private/eventimages/${id}`;
export const getProductsURL = (id: string) => `${BASE_URL}/api/private/products/ong/${id}`;
export const getProductDetails = (id: string) => `${BASE_URL}/api/private/products/${id}`;
export const getProductImages = (id: string) => `${BASE_URL}/api/private/productImages/${id}`;
export const getEventImagesUrl = (eventId: string) => `${BASE_URL}/api/private/eventimages/${eventId}`;
export const getTransparencyURL = (ongId: string) => `${BASE_URL}/api/private/ongs/${ongId}/transparency`;
export const getCoursesURL = (ongId: string) => `${BASE_URL}/api/private/courses/ong/${ongId}`;
export const getBuyCourseUrl = (courseId: string) => `${BASE_URL}/api/private/buycourse/${courseId}/start`;
export const getOngLogos = (ongId: string) => `${BASE_URL}/api/private/ongs/${ongId}/logos`;
