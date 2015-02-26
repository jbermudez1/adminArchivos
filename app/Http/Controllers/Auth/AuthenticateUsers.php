<?php
/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 26/02/15
 * Time: 15:21
 */

namespace AdminFiles\Http\Controllers\Auth;

use Illuminate\Http\Request;

trait AuthenticateUsers {
    /**
     * The Guard implementation.
     *
     * @var Guard
     */
    protected $auth;

    /**
     * The registrar implementation.
     *
     * @var Registrar
     */
    protected $registrar;

    /**
     * Show the application login form.
     *
     * @return \Illuminate\Http\Response
     */
    public function getLogin()
    {
        return view('auth.login');
    }

    /**
     * Handle a login request to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function postLogin(Request $request)
    {
        $this->validate($request, [
            'username' => 'required', 'password' => 'required',
        ]);

        $credentials = $request->only('username', 'password');

        if ($this->auth->attempt($credentials, $request->has('remember')))
        {
            return redirect()->intended($this->redirectPath());
        }

        return redirect($this->loginPath())
            ->withInput($request->only('username', 'remember'))
            ->withErrors([
                'email' => 'Las credenciales no coinciden con nuestros registros.',
            ]);
    }

    /**
     * Log the user out of the application.
     *
     * @return \Illuminate\Http\Response
     */
    public function getLogout()
    {
        $this->auth->logout();

        return redirect('/');
    }

    /**
     * Get the post register / login redirect path.
     *
     * @return string
     */
    public function redirectPath()
    {
        if (property_exists($this, 'redirectPath'))
        {
            return $this->redirectPath;
        }

        return property_exists($this, 'redirectTo') ? $this->redirectTo : '/';
    }

    /**
     * Get the path to the login route.
     *
     * @return string
     */
    public function loginPath()
    {
        return property_exists($this, 'loginPath') ? $this->loginPath : '/account/login';
    }

}