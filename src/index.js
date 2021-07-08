import app from './app';

app.listen(app.get('PORT'),()=>{
  console.log(`Server started onn port ${app.get('PORT')}`)
});