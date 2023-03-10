"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripService = void 0;
var TripService = /** @class */ (function () {
    function TripService(knex) {
        this.knex = knex;
    }
    TripService.prototype.checkDuplicate = function (values, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("schedule.name")
                            .from("user_schedule")
                            .join("schedule", "schedule.id", "=", "user_schedule.schedule_id")
                            .where("user_schedule.user_id", "=", user_id)
                            .andWhere("schedule.name", "=", values)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    TripService.prototype.createTrip = function (values, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var schedule_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .insert({
                            "name": values.nameOfTrip,
                            "privacy": values.privacy
                        })
                            .into("schedule")
                            .returning("id")];
                    case 1:
                        schedule_id = _a.sent();
                        return [4 /*yield*/, this.knex
                                .insert({
                                "user_id": userId,
                                "schedule_id": schedule_id[0].id
                            })
                                .into("user_schedule")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TripService.prototype.getPlansFromServer = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var scheduleData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("schedule.id", "schedule.name", "user.username", "schedule.privacy", "activity_image.image")
                            .count("content.id as count")
                            .from("user")
                            .join("user_schedule", "user_schedule.user_id", "=", "user.id")
                            .join("schedule", "schedule.id", "=", "user_schedule.schedule_id")
                            .leftJoin("content", "content.schedule_id", "=", "schedule.id")
                            .leftJoin("activity", "activity.id", "=", "content.activity_id")
                            .leftJoin("activity_image", "activity_image.activity_id", "=", "activity.id")
                            .where("user_schedule.user_id", "=", user_id)
                            .groupBy("content.id", "schedule.id", "schedule.name", "user.username", "schedule.privacy", "activity_image.image")];
                    case 1:
                        scheduleData = _a.sent();
                        console.log("scheduleData from service: ", scheduleData);
                        return [2 /*return*/, { scheduleData: scheduleData }];
                }
            });
        });
    };
    TripService.prototype.getSavedActivityFromServer = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var savedActivityData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("schedule.id", "schedule.name", "activity.name as activity", "activity_image.image")
                            .from("user_schedule")
                            .join("schedule", "schedule.id", "=", "user_schedule.schedule_id")
                            .join("content", "content.schedule_id", "=", "schedule.id")
                            .join("activity", "activity.id", "=", "content.activity_id")
                            .leftJoin("activity_image", "activity_image.activity_id", "=", "activity.id")
                            .where("user_schedule.user_id", "=", user_id)];
                    case 1:
                        savedActivityData = _a.sent();
                        console.log("savedActivityData from service: ", savedActivityData);
                        return [2 /*return*/, { savedActivityData: savedActivityData }];
                }
            });
        });
    };
    TripService.prototype.getTripListFromServer = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var tripData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("schedule.id", "schedule.name")
                            .from("user_schedule")
                            .join("schedule", "schedule.id", "=", "schedule_id")
                            .where("user_schedule.user_id", "=", user_id)];
                    case 1:
                        tripData = _a.sent();
                        return [2 /*return*/, { tripData: tripData }];
                }
            });
        });
    };
    TripService.prototype.checkIsSaved = function (userId, activityId) {
        return __awaiter(this, void 0, void 0, function () {
            var isSaved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("activityId from service: ", activityId);
                        return [4 /*yield*/, this.knex
                                // .select("*")
                                .select("content.activity_id")
                                .from("user_schedule")
                                .join("schedule", "schedule.id", "=", "user_schedule.schedule_id")
                                .join("content", "content.schedule_id", "=", "schedule.id")
                                .where("user_schedule.user_id", "=", userId)
                                .andWhere("content.activity_id", "=", activityId)
                            // let isSaved = await this.knex
                        ];
                    case 1:
                        isSaved = _a.sent();
                        // let isSaved = await this.knex
                        console.log("isSaved from service: ", isSaved);
                        return [2 /*return*/, { isSaved: isSaved }];
                }
            });
        });
    };
    TripService.prototype.getActivityDetail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var activityDetail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("activity.id", "activity.name", "activity.type", "activity.rating", "country.name as country")
                            .from("activity")
                            .leftJoin("country", "activity.id", "=", "country.activity_id")];
                    case 1:
                        activityDetail = _a.sent();
                        return [2 /*return*/, { activityDetail: activityDetail }];
                }
            });
        });
    };
    TripService.prototype.insertActivity = function (dataToInsert) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("dataToInsert: ", dataToInsert);
                        return [4 /*yield*/, this.knex
                                .insert({
                                "schedule_id": dataToInsert.tripId,
                                "day": dataToInsert.eventDate,
                                "activity_id": dataToInsert.activityId,
                                "start_time": dataToInsert.eventStartTime,
                                "end_time": dataToInsert.eventEndTime
                            })
                                .into("content")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TripService.prototype.deleteSavedActivity = function (data, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("content")
                            .join("schedule", "schedule.id", "=", "content.schedule_id")
                            .join("user_schedule", "user_schedule.schedule_id", "=", "schedule.id")
                            .where("content.activity_id", "=", data)
                            .andWhere("user_schedule.user_id", "=", userId)
                            .delete()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TripService.prototype.getSearchResult = function (keyword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return TripService;
}());
exports.TripService = TripService;
//# sourceMappingURL=trip.service.js.map