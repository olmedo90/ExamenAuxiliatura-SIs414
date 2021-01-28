class IndexController {
  constructor() {}
  //services
  index(request, response) {
    response.status(200).json({ msn: "HOLA MUNDO DESDE REST" });
  }
}
export default IndexController;
