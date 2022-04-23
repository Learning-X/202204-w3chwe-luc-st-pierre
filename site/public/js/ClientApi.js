export default class ClientApi {
  nextPage;
  previousPage;
  currentPage;
  count;

  constructor(apiEntryPoint) {
    this.currentPage = apiEntryPoint;
  }
}
