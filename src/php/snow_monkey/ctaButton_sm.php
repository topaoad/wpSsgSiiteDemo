<!-- こちらは本当はレンダーしたくないスノモン親テーマ -->
<?php
$blockName = "cta-button";
$label = get_field("label");
$align = get_field("align");

?>
<div class="<?php echo $align; ?>">
  <div class=" <?php echo $blockName; ?>">
    <?php echo $label; ?>
  </div>
</div>