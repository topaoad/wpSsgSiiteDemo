<?php

/**
 * Plugin name: My Snow Monkey
 * Description: このプラグインに、あなたの Snow Monkey 用カスタマイズコードを書いてください。
 * Version: 0.2.1
 *
 * @package my-snow-monkey
 * @author inc2734
 * @license GPL-2.0+
 */

/**
 * Snow Monkey 以外のテーマを利用している場合は有効化してもカスタマイズが反映されないようにする
 */
$theme = wp_get_theme(get_template());
if ('snow-monkey' !== $theme->template && 'snow-monkey/resources' !== $theme->template) {
	return;
}

/**
 * Directory url of this plugin
 *
 * @var string
 */
define('MY_SNOW_MONKEY_URL', untrailingslashit(plugin_dir_url(__FILE__)));

/**
 * Directory path of this plugin
 *
 * @var string
 */
define('MY_SNOW_MONKEY_PATH', untrailingslashit(plugin_dir_path(__FILE__)));


// style.css読み込み
add_action(
	'wp_enqueue_scripts',
	function () {
		wp_enqueue_style(
			'my-snow-monkey',
			MY_SNOW_MONKEY_URL . '/style.css',
			[Framework\Helper::get_main_style_handle()],
			filemtime(MY_SNOW_MONKEY_PATH . '/style.css')
		);
	}
);

// カスタム関数エリア

// ブロックを追加するアクションフック
add_action('acf/init', 'my_acf_blocks_init');
function my_acf_blocks_init()
{
	$plugin_url = plugin_dir_url(__FILE__);
	$plugin_url_merge =$plugin_url."test-templates/ctaButton/ctaButton.php";
	// var_dump($plugin_url);
	// Check function exists.
	if (function_exists('acf_register_block_type')) {
		// Register a testimonial block.
		acf_register_block_type(array(
			"name" => "ctaButton",
			"title" => "CTA Button",
			"description" => "A call to action block",
			"render_template" => "test-templates/ctaButton/ctaButton.php",
			//本当はマイスノモンから呼び出したいが、うまくいっていない。
			//  "render_template" =>$plugin_url_merge, 
			"category" => "design",
			"icon" => "button",
			"keyword" => array("button", "cta", "call to action"),
		));
	}
}

// ACFオプションエリア
if (function_exists('acf_add_options_page')) {
	acf_add_options_page(array(
		"page_title" => "Main menu",
		"menu_title" => "Main menu",
		"show_in_graphql" => true,
		"icon_url" => "dashicons-menu"
	));
}

// ショートコードエリア
// 主にACF作業用"
// [foobar]
function my_func($atts)
{
	$acf_player_history = get_field('menu_items');

	return ("hello world"


	); //実行したい処理
}
add_shortcode('foobar', 'my_func');


//  [viewsample]
function inpostCf()
{
	$field = get_post_meta(get_the_ID(), 'menu_items', true);
	$txt = get_field('sample');
	return $txt;
}
add_shortcode('viewsample', 'inpostCf');


// 配列の取得は絶賛苦戦中
// function test_scode( $atts ) {
//   extract(shortcode_atts(array(
//     'ar'=>''
//   ),$atts));
 
//   if( isset( $ar )) {
//     // カンマで分割
//     $testArray = explode( ',', $ar );
//   }
 
 
//   // 配列のサイズ分 処理を繰り返す
//   foreach( $post_ids as $tsa ) {
// 		return $tsa ;
//   }

// }
 
// add_shortcode( "viewsample", "test_scode" );