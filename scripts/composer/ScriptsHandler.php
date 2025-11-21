<?php

define('C_RED', "\033[31m");
define('C_GREEN', "\033[32m");
define('C_YELLOW', "\033[33m");
define('C_RESET', "\033[0m");

namespace DrupalProject\Composer;

class ScriptsHandler {
    /**
     * Copy configured settings.php file from directory src/settings to web/sites/default
     */
    public static function copySettingsFile() {
        $source = __DIR__ . '/../../src/settings/settings.php';
        $destination = __DIR__ . '/../../web/sites/default/settings.php';

        if(!file_exists($source)) {
            fwrite(STDERR,  C_RED . "Source settings.php does not exist: $source" . C_RESET . "\n");
        }

        $destination = dirname($destination);
        
        if(!is_dir($destination)) {
            mkdir($destination, 0755, true);
        }

        if(copy($source, $destination)) {
            echo C_GREEN ."Copied (settings.php) successfully from $source to $destination" . C_RESET . "\n";
        } else {
            fwrite(STDERR, C_RED . "Failed to copy (settings.php) from $source to $destination" . C_RESET . "\n");
        }
    }
}