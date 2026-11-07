export default {
  name: 'get_current_step',
  category: 'Utility',
  explanation: 'Returns a persistent global step counter using GameMaker modern Time Source API.',
  code: `function get_current_step() {
    static inst_current_step = undefined;
    if (inst_current_step == undefined) {
        inst_current_step = {};
        inst_current_step.ts = time_source_create(time_source_global, 1, time_source_units_frames, method(inst_current_step, function() {
            ++currentStep;
        }), [], -1);
        time_source_start(inst_current_step.ts);
        inst_current_step.currentStep = 0;
    }
    return inst_current_step.currentStep;
}`
}