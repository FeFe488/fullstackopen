import { TextField,Button } from "@mui/material"



const LoginForm = ({
   handleSubmit,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password
  }) => {
  
  return (
    <div>
      <h2>Login to application</h2>

      
      <form onSubmit={handleSubmit}>
      
        <div>
          <TextField
            variant="standard"
            label="username"
            // type="username"
            value={username}
            onChange={handleUsernameChange}
            />
        </div>

        <div>
          <TextField
            variant="standard"
            style={{marginTop:5}}
            label="password"
            // type="password"
            value={password}
            onChange={handlePasswordChange}
            />
        </div>
        
        <Button type="submit" variant="contained" style={{marginTop:10}}>
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm



