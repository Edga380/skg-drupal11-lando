<?php

namespace DrupalProject\Composer;

/**
 * Message colours
 */
define('C_RED', "\033[31m");
define('C_GREEN', "\033[32m");
define('C_YELLOW', "\033[33m");
define('C_RESET', "\033[0m");

class ScriptsHandler {
    public static function copySettingsFile() {
        self::copyFile(__DIR__ . '/../../src/settings', __DIR__ . '/../../web/sites/default', 'settings.php');
    }

    public static function copyServicesFile() {
        self::copyFile(__DIR__ . '/../../src/settings', __DIR__ . '/../../web/sites/default', 'services.yml');
    }

    public static function copyThemesFolder() {
        self::copyFolder(__DIR__ . '/../../src/themes', __DIR__ . '/../../web/themes/custom');
    }

    public static function copyAssetsFolder() {
        self::copyFolder(__DIR__ . '/../../src/frontend/assets', __DIR__ . '/../../web/themes/custom/skg_theme/assets');
    }

    /**
     * Copy 'copyFile' file from selected $source to selected $destination
     */
    public static function copyFile($source, $destination, $name) {
        $sourceFile = "$source/$name";
        $destinationFile = "$destination/$name";

        if(!file_exists($sourceFile)) {
            fwrite(STDERR,  C_RED . "Source ($name) does not exist in directory: $source" . C_RESET . "\n");
        }
        
        if(!is_dir($destination)) {
            mkdir($destination, 0755, true);
        }

        if(copy($sourceFile, $destinationFile)) {
            echo C_GREEN ."Copied file ($name) successfully from $source to $destination" . C_RESET . "\n";
        } else {
            fwrite(STDERR, C_RED . "Failed to copy file ($name) from $source to $destination" . C_RESET . "\n");
        }
    }


    /**
     * Copy 'copyFolder' folder from selected $source to selected $destination
     */
    public static function copyFolder($source, $destination) {
        if (!is_dir($source)) {
            fwrite(STDERR, C_RED . "Source directory does not exist: $source" . C_RESET . "\n");
            return false;
        }

        if (!is_dir($destination)) {
            mkdir($destination, 0755, true);
        }

        $dir = opendir($source);
        if (!$dir) {
            fwrite(STDERR, C_RED . "Failed to open source directory: $source" . C_RESET . "\n");
            return false;
        }

        while (($file = readdir($dir)) !== false) {
            if ($file == '.' || $file == '..') continue;

            $srcPath = $source . DIRECTORY_SEPARATOR . $file;
            $destPath = $destination . DIRECTORY_SEPARATOR . $file;

            if (is_dir($srcPath)) {
                self::copyFolder($srcPath, $destPath);
            } else {
                if (!copy($srcPath, $destPath)) {
                    fwrite(STDERR, C_RED . "Failed to copy file: $srcPath" . C_RESET . "\n");
                }
            }
        }

        closedir($dir);
        echo C_GREEN . "Copied folder successfully from $source to $destination" . C_RESET . "\n";
        return true;
    }
}