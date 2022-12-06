const findOneMock = {
  id: 1,
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  role: "administrator",
};

const successResponseMock = {
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  role: "administrator",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjcwMzU0Mjk0LCJleHAiOjE2NzA0NDA2OTR9.eXdA9bSak7Th_b2hPvx99ftoEVaLFbFUGNmH3Ns2unQ",
};

const errorResponseMock = {
  message: "Invalid user or password",
};

module.exports = { findOneMock, successResponseMock, errorResponseMock };
