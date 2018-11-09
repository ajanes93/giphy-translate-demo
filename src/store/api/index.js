import http from "../../http";

export default {
  translate(data) {
    return new Promise((resolve, reject) => {
      http.get("/v1/gifs/translate", { params: data }).then(
        response => {
          resolve(response.data);
        },
        error => reject(error)
      );
    });
  }
};
