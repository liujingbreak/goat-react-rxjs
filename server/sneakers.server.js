"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = tslib_1.__importDefault(require("react-dom/server"));
// type SneakerStore = typeof SneakerStoreSubjects;
function default_1(router) {
    // const indexHtml = fs.readFileSync(Path.resolve('build/index.html'));
    const AppServer = require('../ssr-build/main.js');
    router.get('/sneakers', (req, res, next) => {
        const store = AppServer.store;
        store.title.next('Hey Sneakers! (from server side)');
        console.log(server_1.default.renderToString(AppServer.default));
        next();
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25lYWtlcnMuc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc2VydmVyL3NuZWFrZXJzLnNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzRUFBOEM7QUFLOUMsbURBQW1EO0FBRW5ELG1CQUF3QixNQUE0QztJQUNsRSx1RUFBdUU7SUFDdkUsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFFbEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3pDLE1BQU0sS0FBSyxHQUF5QixTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3BELEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBYyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM5RCxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVZELDRCQVVDIn0=