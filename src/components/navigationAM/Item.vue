<template>
	<li @mouseleave="closeDropdown" :id="MenuID" :class="listClass">
		<div class="media-content">
			<router-link :to="menu">
				<slot></slot>
			</router-link>
		</div>
	</li>
</template>

<script>
// import linker from "../linker";
export default {
	// components: { linker },
	props: {
		href: {
			type: String,
			default: undefined
		},
		menu: {
			type: String,
			default: undefined
		},
		uniqID: {
			type: String,
			default: undefined
		},
		MenuID: {
			type: String,
			default: undefined
		},
		action: {
			type: Function,
			default: function() {
				document.body.scrollTop = 0
				this.$parent.$data.showHome = true
				this.$router.replace({ path: this.menu })
			}
		},
		active: {
			type: Boolean,
			default: false
		},
		edit: {
			type: String,
			default: undefined
		}
	},
	data() {
		return {
			id: this.edit,
			onEdit: false,
			changedLabel: ""
		};
	},
	computed: {
		label() {
			if (this.$slots.default.length > 0) {
				return this.$slots.default[0].text;
			}

			return "";
		},
		noEdit() {
			return this.edit === undefined;
		},
		listClass() {
			let style = "side-item";
			style += !this.noEdit ? " media" : "";

			let currentPage = window.location.href.toLowerCase();
			let link = this.href !== undefined ? this.href.toLowerCase() : "";
			
			if (this.$route.path === this.MenuID) {
				style += " is-active";
			} else if (link === currentPage) {
				style += " is-active";
			}

			return style;
		}
	},
	methods: {
		closeDropdown() {
			if (this.$refs.hasOwnProperty("setting")) {
				if (this.$refs.setting === undefined) {
					return false;
				}

				if (this.$refs.setting.hasOwnProperty("isActive")) {
					if (this.$refs.setting.isActive) {
						this.$refs.setting.toggle();
					}
				} else {
					console.log("hidden " + this.edit);
				}
			}
		},
		closeAnyOpenEdit(dropdownShown) {
			if (dropdownShown) {
				if (typeof global.$sidebar.activeEdit === "object") {
					global.$sidebar.activeEdit.cancelEdit();
				}
			}
		},
		cancelEdit() {
			this.onEdit = false;
			global.$sidebar.activeEdit = undefined;
		},
		openEdit() {
			this.onEdit = true;
			this.changedLabel = this.label;
			let el = this.$refs.input;

			el.focus();
			setTimeout(function() {
				el.focus();
			}, 1);

			if (typeof global.$sidebar.activeEdit === "object") {
				global.$sidebar.activeEdit.cancelEdit();
			}

			global.$sidebar.activeEdit = {
				key: this.edit,
				cancelEdit: this.cancelEdit
			};
		},
		doAction() {
			if (this.href === undefined) {
				this.action();
			}
		},
		trash() {
			console.log("ade")
		}
	}
};
</script>