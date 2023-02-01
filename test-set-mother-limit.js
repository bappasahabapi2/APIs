const _ = require("underscore");
const Joi = require("@hapi/joi");
const Dao = require("../../../../util/dao");
const log = require("../../../../util/log");
const { API, SCHEMA, TABLE, CODE } = require("../../../../util/constant");

const {
  getRouteControllerConfigWithHandler,
} = require("../../../../util/apiCreateHelper");

const operationName = "Set Mother Limit";

const payload_scheme = Joi.object({
  default_credit_limit: Joi.string().required(),
  default_financing_percentage: Joi.string().required(),
  default_interest_rate: Joi.string().required(),
  default_disbursement_date: Joi.string().required(),
  start_date: Joi.string().required(),
  end_date: Joi.string().required(),
  created_on: Joi.string().required(),
  created_by: Joi.string().required(),
  mother_limit_id: Joi.string().required(),
});

const add_mother_limit = async (request) => {
  let data = await set_mother_limit(request);
  log.info(` ${operationName}`);
  return {
    status: true,
    code: 200,
    data: data,
    message: "One data Added Successfully",
  };
};

const route_controller = getRouteControllerConfigWithHandler(
  "POST",
  API.SET_MOTHER_LIMIT_HISTORY,
  false,
  operationName,
  {
    failCode: 400,
    payload: payload_scheme,
    operationName,
    handlerFunction: add_mother_limit,
  }
);

const set_mother_limit = async (request) => {
    let data = null;
    const {
      default_credit_limit,
      default_financing_percentage,
      default_interest_rate,
      default_disbursement_date,
      start_date,
      end_date,
      created_on,
      created_by,
      mother_limit_id
    
    } = request.payload
    let sql = {
      text: `INSERT INTO ${SCHEMA.PUBLIC}.${TABLE.MOTHER_LIMIT_HISTORY} (default_credit_limit,default_financing_percentage,default_interest_rate,default_disbursement_date,start_date,end_date,created_on,created_by,mother_limit_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      values: [default_credit_limit,default_financing_percentage,default_interest_rate,default_disbursement_date,start_date,end_date,created_on,created_by,mother_limit_id],
    };
    try {
      data = await Dao.get_data(request.pg, sql);
    } catch (e) {
      log.error(`An exception occurred while executing ${operationName} : ${e?.message}`);
    }
    return data;
  };

  module.exports = route_controller;
