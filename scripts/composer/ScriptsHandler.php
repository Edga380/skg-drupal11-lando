<?php

namespace DrupalProject\Composer;

class ScriptsHandler {
    /**
     * Copy configured settings.php file from directory src/settings to web/sites/default
     */
    public static function copySettingsFile() {
        $source = __DIR__ . '/../../src/settings/settings.php'
        $destination = __DIR__ . '/../../web/sites/default/settings.php'

        if(!file_exists($source)) {
            fwrite(STDERR, "Source settings.php does not exist: $source\n");
        }

        $destination = dirname($destination);
        
        if(!is_dir($destination)) {
            mkdir($destination, 0755, true);
        }

        if(copy($source, $destination)) {
            echo "(settings.php) copied successfully from $source to $destination\n";
        } else {
            fwrite(SDTERR, "Failed to copy settings.php from $source to $destination\n");
        }
    }
}