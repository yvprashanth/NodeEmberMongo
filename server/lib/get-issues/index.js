var _ = require("lodash");
var exec = require("./exec");
var dateQueryBuilder = (require("./date-query-builder"));
var standardQueryBuilder = (require("./standard-query-builder"));

module.exports = function(p_config, p_options, p_callback) {

	// config is passed in through the chain call of simClient.getIssues();
	// if options and callback are present (simClient.getIssues(options, callback))
	// then we can assume the script is calling get issues directly with a already
	// formed query string.
	if(p_config && p_options && p_callback) {
		return exec(p_config, p_options, p_callback);
	}

	// if p_options and p_callback don't exist, then the query string is being chained.
	// config will be under "this.config", passed from the original chain
	this.firstCall = true;
	this.config = p_config;
	this.options = { queryString: "" };
	if(p_options) {
		this.options = _.merge(this.options, p_options);
    }

	return this;
};

module.exports.prototype = {
    schedule: standardQueryBuilder("schedule"),
    shortId: standardQueryBuilder("aliases[0].id"),
	actualCompletionDate: dateQueryBuilder("schedule.actualCompletionDate"),
	actualStartDate: dateQueryBuilder("schedule.actualStartDate:"),
	affects: standardQueryBuilder("affects"),
	aggregatedLabels: standardQueryBuilder("aggregatedLabels"),
	aliases: standardQueryBuilder("aliases"),
	assignedFolder: standardQueryBuilder("assignedFolder"),
	assignee: standardQueryBuilder("assignee"),
	backlogItemType: standardQueryBuilder("extensions.backlog.planningLevel"),
	blocked: standardQueryBuilder("blocked"),
	commentedOnBy: standardQueryBuilder("conversation.author"),
	containingFolder: standardQueryBuilder("containingFolder"),
	createDate: dateQueryBuilder("createDate"),
	description: standardQueryBuilder("description"),
	estimatedCompletionDate: dateQueryBuilder("schedule.estimatedCompletionDate"),
	estimatedStartDate: dateQueryBuilder("schedule.estimatedStartDate"),
	exec: exec,
	folderType: standardQueryBuilder("folderType"),
	frames: standardQueryBuilder("frames"),
	fullText: standardQueryBuilder("full_text"),
	hasSubtasks: standardQueryBuilder("hasSubtasks"),
	id: standardQueryBuilder("id"),
	is: standardQueryBuilder("is"),
	isSubtask: standardQueryBuilder("isSubtask"),
	lastResolvedBy: standardQueryBuilder("lastResolvedBy"),
	lastResolvedDate: dateQueryBuilder("lastResolvedDate"),
	lastUpdatedConversationDate: dateQueryBuilder("lastUpdatedConversationDate"),
	lastUpdatedDate: dateQueryBuilder("lastUpdatedDate"),
	needByDate: dateQueryBuilder("schedule.needByDate"),
	nextStepAction: standardQueryBuilder("next_step.action"),
	nextStepOwner: standardQueryBuilder("next_step.owner:role\\"),
	priority: standardQueryBuilder("extensions.backlog.priority"),
	rank: standardQueryBuilder("extensions.backlog.rank"),
	requester: standardQueryBuilder("requester"),
	setOmitPath: require("./set-omit-path"),
	setSortOrder: require("./set-sort-order"),
	status: standardQueryBuilder("status"),
	submitter: standardQueryBuilder("submitter"),
	subtaskOf: standardQueryBuilder("parentTasks"),
	tags: standardQueryBuilder("tags"),
	title: standardQueryBuilder("title"),
	ttAssignedGroup: standardQueryBuilder("extensions.tt.assignedGroup"),
	ttCategory: standardQueryBuilder("extensions.tt.category"),
	ttImpact: standardQueryBuilder("extensions.tt.impact"),
	ttItem: standardQueryBuilder("extensions.tt.item"),
	ttType: standardQueryBuilder("extensions.tt.type"),
	watchers: standardQueryBuilder("watchers")
};
