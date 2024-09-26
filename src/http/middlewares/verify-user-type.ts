export function verifyUserType(typeToVerify: "RESALE") {
  return async (request, response) => {
    const { type } = request.user;

    if (type !== typeToVerify) {
      return response.status(401).send({ message: "Unauthorized" });
    }
  };
}
