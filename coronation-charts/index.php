<?php
/*
Plugin Name: Coronation Charts
Description: Coronation Charts.
Author: Electric Egg
Version: 1.0
*/

function coronation_charts( $atts ){

    $path = trailingslashit(plugin_dir_path( __FILE__ ) . 'assets');
    $url = trailingslashit(plugin_dir_url( __FILE__ ) . 'assets');
	$scripts = ['d3.v3.min.js','nv.d3.min.js', 'chart.js'];
	$styles = ['nv.d3.css', 'charts.css'];
	foreach($scripts as $script) {
	    $src = $url . $script;
	    wp_enqueue_script($script, $src, [], false, true);
	}
	foreach($styles as $style) {
	    $src = $url . $style;
	    wp_enqueue_style($style, $src, [], false, false);
	}

    if ($atts['code'] == 'interactive') {
        $html = file_get_contents($path . 'interactive.html');
    } else {
        $html = '<div><svg class="cn-chart" id="' . $atts['code'] . '"></svg></div>';
    }

	return $html;
}
add_shortcode( 'coronation_charts', 'coronation_charts' );

?>
