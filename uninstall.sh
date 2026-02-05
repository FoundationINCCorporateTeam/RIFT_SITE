#!/bin/bash
################################################################################
# RIFT Programming Language - Uninstaller
# Version: 1.0.0
# Website: https://rift.astroyds.com
# 
# Usage:
#   curl -sSL https://rift.astroyds.com/rift/uninstall.sh | bash
#   or: rift uninstall
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'
BOLD='\033[1m'

# Configuration
INSTALL_DIR="${RIFT_HOME:-$HOME/.rift}"
BIN_DIR="${RIFT_BIN_DIR:-$HOME/.local/bin}"

print_header() {
    echo -e "${RED}${BOLD}"
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║                                                               ║"
    echo "║   RIFT Programming Language - Uninstaller                     ║"
    echo "║                                                               ║"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

confirm_uninstall() {
    echo -e "${YELLOW}This will remove RIFT from your system:${NC}"
    echo -e "  - Installation: ${BOLD}$INSTALL_DIR${NC}"
    echo -e "  - Commands:     ${BOLD}$BIN_DIR/rift${NC}, ${BOLD}$BIN_DIR/riftserver${NC}"
    echo ""
    read -p "Are you sure you want to uninstall RIFT? (y/N) " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Uninstallation cancelled."
        exit 0
    fi
}

remove_files() {
    echo -e "${CYAN}Removing RIFT files...${NC}"
    
    # Remove installation directory
    if [ -d "$INSTALL_DIR" ]; then
        rm -rf "$INSTALL_DIR"
        echo -e "${GREEN}✓${NC} Removed $INSTALL_DIR"
    else
        echo -e "${YELLOW}⚠${NC} Directory not found: $INSTALL_DIR"
    fi
    
    # Remove commands
    if [ -f "$BIN_DIR/rift" ]; then
        rm -f "$BIN_DIR/rift"
        echo -e "${GREEN}✓${NC} Removed $BIN_DIR/rift"
    fi
    
    if [ -f "$BIN_DIR/riftserver" ]; then
        rm -f "$BIN_DIR/riftserver"
        echo -e "${GREEN}✓${NC} Removed $BIN_DIR/riftserver"
    fi
}

clean_environment() {
    echo -e "${CYAN}Cleaning environment configuration...${NC}"
    
    local shell_configs=("$HOME/.bashrc" "$HOME/.bash_profile" "$HOME/.zshrc" "$HOME/.config/fish/config.fish")
    
    for config in "${shell_configs[@]}"; do
        if [ -f "$config" ]; then
            # Check if config contains RIFT entries
            if grep -q "RIFT Programming Language" "$config" 2>/dev/null; then
                # Create backup
                cp "$config" "${config}.backup"
                
                # Remove RIFT entries
                sed -i.bak '/# RIFT Programming Language/,+2d' "$config" 2>/dev/null || true
                
                echo -e "${GREEN}✓${NC} Cleaned $config"
            fi
        fi
    done
}

print_completion() {
    echo ""
    echo -e "${GREEN}${BOLD}RIFT has been successfully uninstalled.${NC}"
    echo ""
    echo -e "${CYAN}To reinstall RIFT in the future, run:${NC}"
    echo -e "  ${BOLD}curl -sSL https://rift.astroyds.com/rift/install.sh | bash${NC}"
    echo ""
    echo -e "${YELLOW}Note:${NC} You may need to restart your shell for changes to take effect."
    echo ""
}

main() {
    print_header
    confirm_uninstall
    echo ""
    remove_files
    clean_environment
    print_completion
}

main "$@"
