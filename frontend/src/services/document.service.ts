import api from "./api"

export const documentService = {
  upload(file: File) {
    const form = new FormData()
    form.append("file", file)

    return api.post("/documents/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },
}
