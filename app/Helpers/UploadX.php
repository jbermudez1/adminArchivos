<?php
/**
 * Created by PhpStorm.
 * User: yoel
 * Date: 8/12/14
 * Time: 18:13
 */

namespace AdminFiles\Helpers;

use Illuminate\Support\Facades\File;

class UploadX {
    public static  function uploadFile($file,$folder,$name){
        $extension = $file->getClientOriginalExtension();
        // Verify if directory exists
        if (!is_dir($folder))
        {
            // Create directory
            $oldmask = umask(0);
            mkdir($folder, 0777);
            umask($oldmask);
        }

        $url = $folder . '/' . $name . '.' . $extension;
        if (File::copy($file,$url))
        {
            return compact('url','extension');
        }
        else
        {
            return false;
        }
    }

    public static function downloadFile($file,$name){
        $file = public_path() . '/' . $file;
        $headers = array();
        return response()->download($file,$name,$headers);
    }

    public static function deleteFile($url)
    {
        return File::delete($url);
    }

} 