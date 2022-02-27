import axios from "axios";

export default class BooksServices {
  static async getRandomText() {
    const response = await axios.get(
      `https://uncovered-treasure-v1.p.rapidapi.com/random`,
      {
        headers: {
            "x-rapidapi-key": "e0a2097ef9msh44546cfd9d048d1p109452jsn3fcb7586c94f",
            "x-rapidapi-host": "uncovered-treasure-v1.p.rapidapi.com",
          },
      }
    );
    return response;
  }
}
