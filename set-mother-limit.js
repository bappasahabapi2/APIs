"use strict";

const _ = require("underscore");
const Joi = require("@hapi/joi");
const Dao = require("../../../util/dao");
const log = require("../../../util/log");
const {API, SCHEMA, TABLE} = require("../../../util/constant");
const {getRouteControllerConfigWithHandler} = require("../../../util/apiCreateHelper");
const {checkUniqueDataFromDB} = require("../../../util/dataValidityCheckHelper");

const payload_scheme = Joi.object({
  branch_id: Joi.string().required(),
  loan_account_number: Joi.string().required(),
  company_profile_id: Joi.string().required(),
  credit_limit: Joi.string().required(),
  effective_date: Joi.string().required(),
  sales_ledger_balance: Joi.string().required(),
  expiry_date: Joi.string().required(),
  credit_period: Joi.string().required(),
  grace_period: Joi.string().required(),
  interest_rate: Joi.string().required(),
  penalty_rate: Joi.string().required(),
  service_charge: Joi.string().required(),
  safty_deposit_rate: Joi.string().required(),
});

const operationName = "Set Mother Limit"
const set_mother_limit = async (request) => {
  const {
    branch_id,
    loan_account_number,
    company_profile_id,
    credit_limit,
    effective_date,
    sales_ledger_balance,
    expiry_date,
    credit_period,
    grace_period,
    interest_rate,
    penalty_rate,
    service_charge,
    safty_deposit_rate,
  } = request.payload
  let response = {status: false};
  let error = '', statusCode = null;
  // todo: confirm bank-user role value
  if (request.auth.credentials.role !== 'bank_maker') {
    error = "Not Authorized";
    statusCode = 301
  } else if (await checkUniqueDataFromDB({
    request, tableName: `${SCHEMA.PUBLIC}.${TABLE.MOTHER_LIMIT_SETUP}`, multipleFieldsWithValue: [{
      fieldName: 'company_profile_id',
      valueToCheck: company_profile_id
    }]
  })) {
    error = "Limit already set for this client."
  } else {
    let sql = {
      text: `WITH rows AS ( INSERT INTO ${SCHEMA.PUBLIC}.${TABLE.MOTHER_LIMIT_SETUP} (branch_id, loan_account_number,  
              company_profile_id, credit_limit, effective_date, sales_ledger_balance, expiry_date, credit_period, 
              grace_period, interest_rate, penalty_rate, service_charge, safty_deposit_rate, approval_status, remarks,
               created_on, created_by)
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,clock_timestamp(), $16)
              RETURNING id ) SELECT id FROM rows`,
      values: [branch_id, loan_account_number, company_profile_id, credit_limit, effective_date, sales_ledger_balance,
        expiry_date, credit_period, grace_period, interest_rate, penalty_rate, service_charge, safty_deposit_rate,
        "pending", '', request.auth.credentials.user_name,],
    };
    try {
      const data = await Dao.get_data(request.pg, sql);
      log.info(`[Account number ${loan_account_number}, Company ID ${company_profile_id}] - ${operationName}`);
      return {status: true, code: 200, message: 'Added Successfully', data: data[0]};
    } catch (e) {
      log.error(`An exception occurred during ${operationName} : ${e?.message}`);
      error = e?.message
    }
  }
  log.warn(`[${request.auth.credentials.user_name}] - ${error}`);
  return _.extend(response, {code: (statusCode || 400), message: error});
};

const route_controller = getRouteControllerConfigWithHandler('POST', API.SET_MOTHER_LIMIT, true, operationName, {
  payload: payload_scheme, failCode: 400,
  handlerFunction: set_mother_limit
});

module.exports = route_controller;
