<?php
function uploadImage($image) {
    $apiKey = '1de5a69c93a7ce4fa7b4a9a0e5f97898';

    // Prepare the cURL request
    $url = "https://api.imgbb.com/1/upload?key=$apiKey";
    $postFields = [
        'image' => new CURLFile($image['tmp_name'], $image['type'], $image['name']),
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
    $response = curl_exec($ch);
    curl_close($ch);

    // Decode the response and return the image URL
    $result = json_decode($response, true);
    return $result['data']['url'] ?? null;
}
?>
