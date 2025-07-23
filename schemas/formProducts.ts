import * as yup from "yup";


export const SchemaFormCreateProduct = yup.object({
  title: yup.string().required("Title wajib diisi"),
  description: yup.string().min(10).max(1000).required("Description wajib diisi"),
  price: yup
    .number()
    .transform((v, o) => Number(o))
    .typeError("Price harus angka")
    .min(1, "Minimal harga 1 dolar")
    .required("Price wajib diisi"),
  category: yup.string().required("Category wajib diisi"),
  stock: yup.number().typeError("Harus angka").required("Stock wajib diisi"),
  image: yup
    .mixed()
    .required("Gambar wajib diupload")
    .test("fileType", "Format file hanya PNG/JPG", (value: FileList) =>
      value && ["image/png", "image/jpeg"].includes(value[0]?.type)
    )
    .test("fileSize", "Ukuran maksimal 1MB", (value: FileList) =>
      value && value[0]?.size <= 1024 * 1024
    ),
});
export type SchemaFormCreateProductType = yup.InferType<typeof SchemaFormCreateProduct>;

export const SchemaFormEditProduct = yup.object({
  title: yup.string().required("Title wajib diisi"),
  description: yup.string().min(10).max(1000).required("Description wajib diisi"),
  price: yup
    .number()
    .transform((v, o) => Number(o))
    .typeError("Price harus angka")
    .min(1, "Minimal harga 1000")
    .required("Price wajib diisi"),
  category: yup.string().required("Category wajib diisi"),
  stock: yup.number().typeError("Harus angka").required("Stock wajib diisi"),
  image: yup
    .mixed()
    .notRequired()
    .test("fileType", "Format file hanya PNG/JPG", (value: FileList | undefined) =>
      !value || (value.length > 0 && ["image/png", "image/jpeg"].includes(value[0]?.type))
    )
    .test("fileSize", "Ukuran maksimal 1MB", (value: FileList | undefined) =>
      !value || (value.length > 0 && value[0]?.size <= 1024 * 1024)
    ),
});
export type SchemaFormEditProductType = yup.InferType<typeof SchemaFormEditProduct>;
