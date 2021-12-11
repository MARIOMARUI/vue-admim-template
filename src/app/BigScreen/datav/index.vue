<template>
  <div id="data-view">
    <dv-full-screen-container>
      <top-header />

      <div class="main-content">
        <digital-flop />

        <div class="block-left-right-content">
          <ranking-board />

          <div class="block-top-bottom-content">
            <div class="block-top-content">
              <!-- <rose-chart />

              <water-level-chart /> -->
              <div class="continaer">
                <center-map />
              </div>

              <scroll-board />
            </div>

            <cards />
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopHeader from "./topHeader.vue";
import DigitalFlop from "./digitalFlop.vue";
import RankingBoard from "./rankingBoard.vue";
import RoseChart from "./roseChart.vue";
import WaterLevelChart from "./waterLevelChart.vue";
import ScrollBoard from "./scrollBoard.vue";
import Cards from "./Cards.vue";
import CenterMap from "./CenterMap.vue";

@Component({
  components: {
    TopHeader,
    DigitalFlop,
    RankingBoard,
    RoseChart,
    WaterLevelChart,
    ScrollBoard,
    Cards,
    CenterMap,
  },
})
export default class DataView extends Vue {}
</script>

<style lang="scss">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url("./img/bg.png");
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .block-left-right-content {
    flex: 1;
    display: flex;
    margin-top: 20px;
  }

  .block-top-bottom-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .block-top-content {
    height: 55%;
    display: flex;
    flex-grow: 0;
    box-sizing: border-box;
    padding-bottom: 20px;
    .continaer{
      flex: 1;
    }
  }
}
</style>
