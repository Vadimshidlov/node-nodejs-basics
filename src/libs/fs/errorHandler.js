export default function errorHandler(error){
  if (error instanceof Error){
    console.log(error.message)
  } else {
    console.log(error);
  }
}
