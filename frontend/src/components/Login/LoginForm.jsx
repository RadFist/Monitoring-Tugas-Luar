import InputComp from "../InputComp";
import Button from "../ButtonComp";

export default function LoginForm({
  credential,
  submit,
  failedLogin,
  Loading,
  handlerInput,
}) {
  return (
    <form onSubmit={submit}>
      <div className="InputLogin">
        <InputComp
          type="text"
          id="Username"
          placeholder="e.x Budi or budi@gmail.com"
          className={failedLogin.class}
          value={credential.Username}
          onChange={handlerInput}
          labelText={"Username/Email"}
          classlabel={"Login-label"}
        />
      </div>
      <div className="InputLogin">
        <InputComp
          type="password"
          id="Password"
          placeholder="Enter your password"
          value={credential.Password}
          className={failedLogin.class}
          onChange={handlerInput}
          labelText={"Password"}
          classlabel={"Login-label"}
        />
      </div>
      <Button className="ButtonLogin" text="Login">
        {Loading}
      </Button>
      <p className="error-massage">{failedLogin.message}</p>
    </form>
  );
}
