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
    public static  function uploadFile($file,$folder){
        $name = $file->getClientOriginalName();

        // Verify if directory exists
        if (! is_dir($folder))
        {
            // Create directory
            $oldmask = umask(0);
            mkdir($folder, 0777);
            umask($oldmask);
        }
        $url = $folder . '/' . $name;
        if (File::copy($file,$url))
        {
            return $url;
        }
        else
        {
            return false;
        }
    }

    public function downloadFile($file,$name){
        $file = public_path() . '/' . $file;
        $headers = array();
        return Response::download($file,$name,$headers);
    }

    public static function deleteFile($url)
    {
        return File::delete($url);
    }

} 