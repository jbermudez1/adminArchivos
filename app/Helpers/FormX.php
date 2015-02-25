<?php
/**
 * Created by PhpStorm.
 * User: yoel
 * Date: 7/11/14
 * Time: 0:39
 * Class for create form's
 */

namespace AdminFiles\Helpers;

class FormX {
    private $body       = "";
    private $method     = "";
    private $request    = "";

    public static function make()
    {
        return new static;
    }

    public function input($name,$label,$placeholder,$value="",$input="text")
    {
        $this->body .= (string) view('admin.forms.input', compact('name', 'label', 'input', 'placeholder', 'value'));
        return $this;
    }

    public function checkbox($name,$label,$value = false,$col="12",$class="success")
    {
        $this->body .= (string) view('admin.forms.checkbox',compact('name','label','value','class','col'));
        return $this;
    }

    public function select($name,$label, $list,$value=0,$default = 'Elija un valor',$width = 250)
    {
        $this->body .= (string) view('admin.forms.select',compact('name','list','default','width','label','value'));
        return $this;
    }

    public function hidden($name,$value)
    {
        $this->body .= (string) view('admin.forms.hidden',compact('name','value'));
        return $this;
    }

    public function textarea($name, $label, $placeholder, $value="",$rows= 3)
    {
        $this->body .= (string) view('admin.forms.textarea',compact('name','label','value','placeholder','rows'));
        return $this;
    }


    public function button($name,$label,$class='primary',$type='submit')
    {
        $this->body .= (string) view('admin.forms.button',compact('name','label', 'type','class'));
        return $this;
    }

    public function file($name,$label,$src='',$class='primary')
    {
        $this->body .= (string) view('admin.forms.file',compact('name','src','label','class'));
        return $this;
    }

    public function __toString()
    {
        return (string) view('admin.forms.build',
            [
                'body'      => $this->body,
                'request'   => $this->request,
                'method'    => $this->method
            ]);
    }
}