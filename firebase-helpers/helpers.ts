export interface ReturnType {
  info: string,
  error: string | null,
  code: 200 | 400 | 500,
}

// 200 -> OK
// 400 -> Request Error
// 500 -> Server Error
