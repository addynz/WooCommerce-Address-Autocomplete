<?php
/*
Plugin Name: NZ Address Autocomplete for WooCommerce
Version: 1.1.4
Author: Addy Limited
Author URI: https://www.addy.co.nz
Description: Addy's address autocomplete will improve the speed, accuracy and customer experience of your WooCommerce checkout page.
*/
 
if (!defined('ABSPATH')) {
	exit;
}

/* Verify that woocommerce is installed */
if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
	add_action('woocommerce_after_checkout_form', 'register_addy_complete');
	add_action('woocommerce_after_edit_address_form_billing', 'register_addy_complete');
	add_action('woocommerce_after_edit_address_form_shipping', 'register_addy_complete');
 	add_action('wp_enqueue_scripts', 'add_addy_frontend_scripts');
	
 	function add_addy_frontend_scripts() {
 		wp_enqueue_script('jquery');
 		wp_enqueue_script('jquery-ui-autocomplete');
		
		$addy_script_path = plugins_url('/assets/js/addycomplete.min.js', __FILE__ );
		wp_enqueue_script('addy-script', $addy_script_path);
								
		$addy_style_path = plugins_url('/assets/css/addycomplete.min.css', __FILE__ );
		wp_enqueue_style('addy-css', $addy_style_path);
	}
		
	function register_addy_complete($checkout) {
 		$addy_api_key = esc_attr(get_option('addy-api-key'));
 		$addy_hide_postcode = get_option('addy-hide-postcode');

		echo "<script>\n var addyConfig = { 'key': '{$addy_api_key}', hidePostCode: '$addy_hide_postcode' };\n</script>";
	}

	add_filter('woocommerce_get_sections_checkout', 'register_addy_settings');
	add_filter('woocommerce_get_settings_checkout', 'addy_settings', 10, 1);
	
	function register_addy_settings($sections) {
		$sections['addy'] = __( 'addy', 'text-domain' );
		return $sections;
	}

	function addy_settings($settings) {
		$settings[] = array('name' => __( 'Addy Autocomplete Settings', 'text-domain' ),
			'type' => 'title',
			'desc' => __( 'Configure your address validation and verification settings below:', 'text-domain' ),
			'id' => 'addy-api-settings' );

		$settings[] = array(
			'name'     => __( 'Addy API Key', 'text-domain' ),
			'desc_tip' => __( 'Get your free Addy API Key from www.addy.co.nz', 'text-domain' ),
			'id'       => 'addy-api-key',
			'type'     => 'text',
			'desc'     => __( 'Get your free Addy API key from <a href="https://www.addy.co.nz/signup" target="_blank">www.addy.co.nz</a>', 'text-domain' ),
		);

		$settings[] = array(
			'name'     => __( 'PO Box addresses', 'text-domain' ),
			'id'       => 'addy-hide-postcode',
			'type'     => 'checkbox',
			'desc'     => __( 'Check this box if you do not ship to PO Box addresses', 'text-domain' ),
		);		

		$settings[] = array( 'type' => 'sectionend', 'id' => 'addy-api-settings' );
		return $settings;
	}  	
}
?>
